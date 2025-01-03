import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from 'import { useToast } from "@/hooks/use-toast"'
import { BulkActions } from './BulkActions'
import { EnrollmentAnalytics } from './EnrollmentAnalytics'
import { SchoolSettingsManager } from './SchoolSettingsManager'

export function AdminDashboard() {
  const [applications, setApplications] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('ALL')
  const [gradeLevelFilter, setGradeLevelFilter] = useState('ALL')
  const { toast } = useToast()

  useEffect(() => {
    fetchApplications()
  }, [])

  const fetchApplications = async () => {
    try {
      const response = await fetch('/api/admin/applications')
      if (response.ok) {
        const data = await response.json()
        setApplications(data.applications)
      } else {
        throw new Error('Failed to fetch applications')
      }
    } catch (error) {
      console.error('Error fetching applications:', error)
      toast({
        title: "Error",
        description: "Failed to fetch applications. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleStatusChange = async (applicationId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/admin/applications/${applicationId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      })
      if (response.ok) {
        fetchApplications()
        toast({
          title: "Success",
          description: "Application status updated successfully.",
        })
      } else {
        throw new Error('Failed to update application status')
      }
    } catch (error) {
      console.error('Error updating application status:', error)
      toast({
        title: "Error",
        description: "Failed to update application status.",
        variant: "destructive",
      })
    }
  }

  const handleGeneratePDF = async (applicationId: string) => {
    try {
      const response = await fetch(`/api/generate-pdf?applicationId=${applicationId}`)
      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.style.display = 'none'
        a.href = url
        a.download = `application-${applicationId}.pdf`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
      } else {
        throw new Error('Failed to generate PDF')
      }
    } catch (error) {
      console.error('Error generating PDF:', error)
      toast({
        title: "Error",
        description: "Failed to generate PDF. Please try again.",
        variant: "destructive",
      })
    }
  }

  const filteredApplications = applications.filter(app =>
    (app.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
     app.gradeLevel.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (statusFilter === 'ALL' || app.status === statusFilter) &&
    (gradeLevelFilter === 'ALL' || app.gradeLevel === gradeLevelFilter)
  )

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Admin Dashboard</h2>
      
      <EnrollmentAnalytics />

      <Card>
        <CardHeader>
          <CardTitle>Application Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-4">
            <Input
              placeholder="Search by name or grade level"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All</SelectItem>
                <SelectItem value="PENDING">Pending</SelectItem>
                <SelectItem value="APPROVED">Approved</SelectItem>
                <SelectItem value="REJECTED">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Select value={gradeLevelFilter} onValueChange={setGradeLevelFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by grade level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All</SelectItem>
                <SelectItem value="ELEMENTARY">Elementary</SelectItem>
                <SelectItem value="JUNIOR_HIGH">Junior High</SelectItem>
                <SelectItem value="SENIOR_HIGH">Senior High</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <BulkActions applications={filteredApplications} onActionComplete={fetchApplications} />

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student Name</TableHead>
                <TableHead>Grade Level</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredApplications.map((app) => (
                <TableRow key={app.id}>
                  <TableCell>{app.studentName}</TableCell>
                  <TableCell>{app.gradeLevel}</TableCell>
                  <TableCell>{app.status}</TableCell>
                  <TableCell>
                    <Select
                      value={app.status}
                      onValueChange={(newStatus) => handleStatusChange(app.id, newStatus)}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Change status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="PENDING">Pending</SelectItem>
                        <SelectItem value="APPROVED">Approved</SelectItem>
                        <SelectItem value="REJECTED">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button onClick={() => handleGeneratePDF(app.id)} className="ml-2">Generate PDF</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <SchoolSettingsManager />
    </div>
  )
}

