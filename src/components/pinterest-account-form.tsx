'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface PinterestAccountFormProps {
  id: string  // Change this to 'id' if it exists
  initialData?: {
    accessToken: string
  }
}

export function PinterestAccountForm({ id, initialData }: PinterestAccountFormProps) {
  const router = useRouter()
  const [accessToken, setAccessToken] = useState(initialData?.accessToken || '')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const response = await fetch(`/api/customers/${id}/pinterest`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ accessToken }),
    })

    if (response.ok) {
      router.refresh()
    } else {
      // Handle error
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="accessToken">Pinterest Access Token</Label>
        <Input
          id="accessToken"
          value={accessToken}
          onChange={(e) => setAccessToken(e.target.value)}
          required
        />
      </div>
      <Button type="submit">Connect Pinterest Account</Button>
    </form>
  )
}