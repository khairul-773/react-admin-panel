#!/bin/bash

# Fix TypeScript strict mode errors

echo "Fixing TypeScript errors..."

# Fix Header.tsx - Remove React import and fix user initial
sed -i "s/import React, { useState } from 'react';/import { useState } from 'react';/" src/components/layout/Header.tsx
sed -i "s/{user?.email\?\.\[0\].toUpperCase() || 'A'}/{user?.email?.charAt(0).toUpperCase() || 'A'}/" src/components/layout/Header.tsx

echo "Done! Errors fixed."
