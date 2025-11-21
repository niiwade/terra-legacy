'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@/lib/frappe-api';
import { useAuth as useFrappeAuth } from '@/hooks/useFrappeAPI';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  refetch: () => Promise<void>;
  // Terra Legacy membership integration
  membership: {
    type: 'free' | 'gold' | 'platinum';
    expiryDate?: string;
    features: {
      coursesIncluded: number;
      accessDuration: string;
      contentPosts: number;
    };
  } | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const frappeAuth = useFrappeAuth();
  const [membership, setMembership] = useState<AuthContextType['membership']>(null);

  // Load membership info when user changes
  useEffect(() => {
    if (frappeAuth.user) {
      loadMembershipInfo(frappeAuth.user);
    } else {
      setMembership(null);
    }
  }, [frappeAuth.user]);

  const loadMembershipInfo = async (user: User) => {
    try {
      // This would typically come from Frappe API or your membership system
      // For now, we'll determine membership based on user roles
      const userRoles = user.roles || [];
      
      if (userRoles.includes('Platinum Member')) {
        setMembership({
          type: 'platinum',
          expiryDate: '2025-09-11', // This would come from actual membership data
          features: {
            coursesIncluded: 5,
            accessDuration: '1 year',
            contentPosts: 2
          }
        });
      } else if (userRoles.includes('Gold Member')) {
        setMembership({
          type: 'gold',
          expiryDate: '2025-03-11', // This would come from actual membership data
          features: {
            coursesIncluded: 2,
            accessDuration: '6 months',
            contentPosts: 1
          }
        });
      } else {
        setMembership({
          type: 'free',
          features: {
            coursesIncluded: 1, // Free Permaculture course
            accessDuration: '3 days trial',
            contentPosts: 0
          }
        });
      }
    } catch (error) {
      console.error('Error loading membership info:', error);
      // Default to free membership
      setMembership({
        type: 'free',
        features: {
          coursesIncluded: 1,
          accessDuration: '3 days trial',
          contentPosts: 0
        }
      });
    }
  };

  const contextValue: AuthContextType = {
    ...frappeAuth,
    membership
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Higher-order component for protecting routes
export function withAuth<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  options: {
    requireAuth?: boolean;
    requireMembership?: 'free' | 'gold' | 'platinum';
    redirectTo?: string;
  } = {}
) {
  const {
    requireAuth = true,
    requireMembership,
    redirectTo = '/login'
  } = options;

  return function ProtectedComponent(props: P) {
    const { isAuthenticated, loading, membership } = useAuth();

    useEffect(() => {
      if (!loading) {
        if (requireAuth && !isAuthenticated) {
          window.location.href = redirectTo;
          return;
        }

        if (requireMembership && membership) {
          const membershipHierarchy = { free: 0, gold: 1, platinum: 2 };
          const requiredLevel = membershipHierarchy[requireMembership];
          const userLevel = membershipHierarchy[membership.type];

          if (userLevel < requiredLevel) {
            window.location.href = '/membership';
            return;
          }
        }
      }
    }, [loading, isAuthenticated, membership]);

    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-forest"></div>
        </div>
      );
    }

    if (requireAuth && !isAuthenticated) {
      return null; // Will redirect in useEffect
    }

    return <WrappedComponent {...props} />;
  };
}