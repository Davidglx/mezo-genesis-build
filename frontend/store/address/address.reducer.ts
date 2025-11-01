import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WalletState {
  address: string | null;
  isConnected: boolean;
  chainId: number | null;
  balance: string | null;
  musdBalance: string | null;
}

const initialState: WalletState = {
  address: null,
  isConnected: false,
  chainId: null,
  balance: null,
  musdBalance: null,
};

const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    setWalletAddress: (state, action: PayloadAction<string>) => {
      state.address = action.payload;
      state.isConnected = true;
    },
    setChainId: (state, action: PayloadAction<number>) => {
      state.chainId = action.payload;
    },
    setBalance: (state, action: PayloadAction<string>) => {
      state.balance = action.payload;
    },
    setMusdBalance: (state, action: PayloadAction<string>) => {
      state.musdBalance = action.payload;
    },
    disconnectWallet: (state) => {
      state.address = null;
      state.isConnected = false;
      state.chainId = null;
      state.balance = null;
      state.musdBalance = null;
    },
  },
});

export const {
  setWalletAddress,
  setChainId,
  setBalance,
  setMusdBalance,
  disconnectWallet,
} = walletSlice.actions;

export default walletSlice.reducer;