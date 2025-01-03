import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useToast } from 'import { useToast } from "@/hooks/use-toast"'
import { EnrollmentPeriodManager } from './EnrollmentPeriodManager'
import { SchoolSettingsManager } from './SchoolSettingsManager'
import { EnrollmentAnalytics } from './EnrollmentAnalytics'
import { AdminManagement } from './AdminManagement'

export function SuperAdminDashboard() {
  const { toast } = useToast()

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Super Admin Dashboard</h2>
      
      <EnrollmentPeriodManager />
      
      <SchoolSettingsManager />
      
      <EnrollmentAnalytics />
      
      <AdminManagement />

      <Card>
        <CardHeader>
          <CardTitle>System Management</CardTitle>
        </CardHeader>
        <CardContent>
          <Button onClick={() => toast({ title: "Feature coming soon", description: "This feature is not yet implemented." })}>
            Manage System Settings
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

