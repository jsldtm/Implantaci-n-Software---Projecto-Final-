import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import ProductsListedByCategory from '../components/ProductsListedByCategory/ProductsListedByCategory';

const meta: Meta<typeof ProductsListedByCategory> = {
  title: 'Interface2/ProductListByCategory',
  component: ProductsListedByCategory,
};

export default meta;

type Story = StoryObj<typeof ProductsListedByCategory>;

export const Default: Story = {
  args: {
    products: [
      {
        name: 'Cable USB-B',
        price: '$19.99 MXN',
        imageSrc: 'usb-cable.jpg',
      },
      {
        name: 'Wireless Desk Charging',
        price: '$140.94 MXN',
        imageSrc: 'wireless-charger.jpg',
      },
      {
        name: 'Vintage Bluetooth Retro Vinyl Turntable',
        price: '$3,499.99 MXN',
        imageSrc: 'turntable.jpg',
      },
    ],
  },
};