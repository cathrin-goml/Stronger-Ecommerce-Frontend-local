import React from 'react';
import {
  IndexTable,
  Card,
  TextField,
  Button,
  Box,
  Text,
  Icon,
  Link,
} from '@shopify/polaris';
import { SearchIcon } from '@shopify/polaris-icons';
import { useNavigate } from 'react-router-dom';
import type { EDITransactionListItem } from '../../types/edi';
import { StatusBadge } from '../common/StatusBadge';
import { DocumentBadgePills } from './DocumentBadgePills';
import { formatCurrency } from '../../lib/formatters';

interface TransactionsTableProps {
  transactions: EDITransactionListItem[];
  searchQuery: string;
  onSearchChange: (value: string) => void;
  totalCount: number;
}

export const TransactionsTable: React.FC<TransactionsTableProps> = ({
  transactions,
  searchQuery,
  onSearchChange,
  totalCount,
}) => {
  const navigate = useNavigate();

  const resourceName = {
    singular: 'order',
    plural: 'orders',
  };

  const headings: [
    { title: string },
    ...Array<{ title: string; alignment?: 'start' | 'center' | 'end' }>
  ] = [
    { title: 'PO number' },
    { title: 'Status' },
    { title: 'PO date' },
    { title: 'Customer' },
    { title: 'Items' },
    { title: 'Shopify order' },
    { title: 'Documents' },
    { title: '', alignment: 'end' },
  ];

  const rowMarkup = transactions.map((tx, index) => (
    <IndexTable.Row
      id={tx.id}
      key={tx.id}
      position={index}
      onClick={() => navigate(`/transactions/${tx.poNumber}`)}
    >
      <IndexTable.Cell>
        <Text as="span" variant="bodyMd" fontWeight="semibold">
          <Link
            url={`/transactions/${tx.poNumber}`}
            removeUnderline
            onClick={() => {
              navigate(`/transactions/${tx.poNumber}`);
            }}
          >
            {tx.poNumber}
          </Link>
        </Text>
      </IndexTable.Cell>

      <IndexTable.Cell>
        <StatusBadge label={tx.status.label} tone={tx.status.tone} />
      </IndexTable.Cell>

      <IndexTable.Cell>
        <Text as="span" tone="subdued">
          {tx.poDate}
        </Text>
      </IndexTable.Cell>

      <IndexTable.Cell>
        <Text as="span" fontWeight="medium">
          {tx.customer}
        </Text>
      </IndexTable.Cell>

      <IndexTable.Cell>
        <Text as="span">
          {tx.itemCount} · {formatCurrency(tx.orderTotal)}
        </Text>
      </IndexTable.Cell>

      <IndexTable.Cell>
        {tx.shopifyOrder ? (
          <Text as="span" fontWeight="semibold">
            {tx.shopifyOrder}
          </Text>
        ) : (
          <Text as="span" tone="subdued">
            Not created
          </Text>
        )}
      </IndexTable.Cell>

      <IndexTable.Cell>
        <DocumentBadgePills summary={tx.documentsSummary} />
      </IndexTable.Cell>

      <IndexTable.Cell>
        <div
          style={{ textAlign: 'right' }}
          onClick={(e) => e.stopPropagation()}
        >
          <Button
            size="slim"
            onClick={() => navigate(`/transactions/${tx.poNumber}`)}
          >
            View
          </Button>
        </div>
      </IndexTable.Cell>
    </IndexTable.Row>
  ));

  return (
    <Card padding="0">
      {/* Search Input Bar */}
      <Box padding="300" borderBlockEndWidth="025" borderColor="border">
        <TextField
          label="Search orders"
          labelHidden
          placeholder="Search PO #, customer, Shopify order, SKU, tracking (last 4)"
          value={searchQuery}
          onChange={onSearchChange}
          prefix={<Icon source={SearchIcon} tone="subdued" />}
          autoComplete="off"
          clearButton
          onClearButtonClick={() => onSearchChange('')}
        />
      </Box>

      {/* Polaris IndexTable */}
      <IndexTable
        resourceName={resourceName}
        itemCount={transactions.length}
        headings={headings}
        selectable={false}
      >
        {rowMarkup}
      </IndexTable>

      {/* Footer Info */}
      <Box padding="300" borderBlockStartWidth="025" borderColor="border">
        <Text as="p" variant="bodyXs" tone="subdued">
          Showing {transactions.length} of {totalCount} orders
        </Text>
      </Box>
    </Card>
  );
};
