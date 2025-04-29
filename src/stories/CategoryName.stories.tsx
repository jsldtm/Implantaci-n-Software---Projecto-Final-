import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import CategoryName from './CategoryName';

const meta: Meta<typeof CategoryName> = {
  title: 'Interface2/CategoriesBar/CategoryName',
  component: CategoryName,
};

export default meta;

type Story = StoryObj<typeof CategoryName>;

export const Default: Story = {
  args: {
    name: 'Category',
    isSelected: false,
    onClick: () => console.log('Category clicked'),
  },
};

export const Selected: Story = {
  args: {
    name: 'Selected Category',
    isSelected: true,
    onClick: () => console.log('Selected Category clicked'),
  },
};