import React, { createContext, useContext, ReactNode } from 'react';
import { Cafe, Review, getAllCafes } from '@/lib/mock-data';

interface ChatContextType {
  getCafes: () => Cafe[];
  getCafeById: (id: number) => Cafe | undefined;
  getReviews: (cafeId: number) => Review[];
  getCafeLink: (cafeId: number) => string;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const getCafes = () => {
    return getAllCafes();
  };

  const getCafeById = (id: number) => {
    return getAllCafes().find(cafe => cafe.id === id);
  };

  const getReviews = (cafeId: number): Review[] => {
    const reviews = JSON.parse(localStorage.getItem("reviews") || "[]");
    return reviews.filter((review: Review) => review.cafeId === cafeId);
  };

  const getCafeLink = (cafeId: number) => {
    return `/cafe/${cafeId}`;
  };

  return (
    <ChatContext.Provider value={{ getCafes, getCafeById, getReviews, getCafeLink }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
};
