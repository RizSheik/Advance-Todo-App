import { useState } from 'react'
import { Trash2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

interface Todo {
  id: number
  text: string
  completed: boolean
  category: string
}

interface TodoItemProps {
  todo: Todo
  onToggle: (id: number) => void
  onDelete: (id: number) => void
}

export default function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <li 
      className={`flex items-center space-x-2 bg-white dark:bg-gray-700 p-4 rounded-lg shadow transition-all duration-300 ease-in-out ${
        isHovered ? 'shadow-lg transform -translate-y-1' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Checkbox
        id={`todo-${todo.id}`}
        checked={todo.completed}
        onCheckedChange={() => onToggle(todo.id)}
      />
      <label
        htmlFor={`todo-${todo.id}`}
        className={`flex-grow ${todo.completed ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-900 dark:text-white'}`}
      >
        {todo.text}
      </label>
      <span className={`text-sm ${getCategoryColor(todo.category)}`}>
        {todo.category}
      </span>
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={() => onDelete(todo.id)}
        className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <Trash2 className="h-5 w-5 text-red-500" />
        <span className="sr-only">Delete</span>
      </Button>
    </li>
  )
}

function getCategoryColor(category: string): string {
  switch (category) {
    case 'Work':
      return 'text-blue-500'
    case 'Personal':
      return 'text-green-500'
    case 'Shopping':
      return 'text-yellow-500'
    default:
      return 'text-gray-500'
  }
}

