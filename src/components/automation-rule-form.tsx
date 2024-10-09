'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface AutomationRuleFormProps {
  id: string  // Change this to 'id' if it exists
  pinterestBoards: { id: string; name: string }[]
  productSections: string[]
}

export function AutomationRuleForm({ id, pinterestBoards, productSections }: AutomationRuleFormProps) {
  const router = useRouter()
  const [boardId, setBoardId] = useState('')
  const [productSection, setProductSection] = useState('')
  const [frequency, setFrequency] = useState('')
  const [timezone, setTimezone] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const response = await fetch(`/api/customers/${id}/automation-rules`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ boardId, productSection, frequency, timezone }),
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
        <Label htmlFor="boardId">Pinterest Board</Label>
        <Select
          value={boardId}
          onValueChange={setBoardId}
          required
        >
          <SelectValue placeholder="Choose a board" />
          <SelectTrigger id="boardId">
            <SelectContent>
              {pinterestBoards.map((board) => (
                <SelectItem key={board.id} value={board.id}>{board.name}</SelectItem>
              ))}
            </SelectContent>
          </SelectTrigger>
        </Select>
      </div>
      <div>
        <Label htmlFor="productSection">Product Section</Label>
        <Select
          value={productSection}
          onValueChange={setProductSection}
          required
        >
          <SelectValue placeholder="Choose a product section" />
          <SelectTrigger id="productSection">
            <SelectContent>
              <SelectItem value="any">Any</SelectItem>
              {productSections.map((section) => (
                <SelectItem key={section} value={section}>{section}</SelectItem>
              ))}
            </SelectContent>
          </SelectTrigger>
        </Select>
      </div>
      <div>
        <Label htmlFor="frequency">Frequency (hours)</Label>
        <Input
          id="frequency"
          type="number"
          min="1"
          value={frequency}
          onChange={(e) => setFrequency(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="timezone">Timezone</Label>
        <Input
          id="timezone"
          value={timezone}
          onChange={(e) => setTimezone(e.target.value)}
          required
        />
      </div>
      <Button type="submit">Create Automation Rule</Button>
    </form>
  )
}