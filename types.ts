
import React from 'react';

export interface Module {
  id: number;
  title: string;
  description: string;
  topics: string[];
}

export interface Advantage {
  title: string;
  description: string;
  icon: React.ReactNode;
}