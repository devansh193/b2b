"use client";

import { OrgSelectionView } from "../views/org-selection-view";
import { AuthLayout } from "../layouts/auth-layout";
import { useOrganization } from "@clerk/nextjs";

export const OrganizationGuard = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { organization } = useOrganization();
  if (!organization) {
    return (
      <AuthLayout>
        <OrgSelectionView />
      </AuthLayout>
    );
  }
  return <>{children}</>;
};
