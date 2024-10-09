'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Store } from 'lucide-react'

interface CustomerFormProps {
  id?: string
  initialData?: {
    etsyStoreName: string
  }
}

export function CustomerForm({ id, initialData }: CustomerFormProps) {
  const router = useRouter()
  const [etsyStoreName, setEtsyStoreName] = useState(initialData?.etsyStoreName || '')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const response = await fetch(`/api/customers${id ? `/${id}` : ''}`, {
      method: id ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ etsyStoreName }),
    })

    if (response.ok) {
      router.push('/dashboard')
    } else {
      // Handle error
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Store className="mr-2 h-6 w-6" />
          {id ? 'Update Customer' : 'Add New Customer'}
        </CardTitle>
        <CardDescription>
          {id ? 'Update the details of your existing customer.' : 'Enter the details of your new customer.'}
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="etsyStoreName">Etsy Store Name</Label>
              <Input
                id="etsyStoreName"
                value={etsyStoreName}
                onChange={(e) => setEtsyStoreName(e.target.value)}
                required
                placeholder="Enter Etsy store name"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            {id ? 'Update' : 'Add'} Customer
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}