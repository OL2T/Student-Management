import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

interface Student {
  ID: number
  Name: string
  Email: string
}

export default function Home() {
  const [data, setData] = useState<Student[]>([])
  useEffect(() => {
    axios
      .get('http://localhost:8081/')
      .then((response) => {
        console.log(response)
        setData(response.data)
      })
      .catch((error) => console.log(error))
  }, [])
  return (
    <>
      <div className='container mx-auto py-8'>
        <h1 className='text-3xl font-bold'>Student List</h1>
        <div className='mt-6'>
          <Link
            to={'/student/add'}
            className='focus:ring-blue-30 mt-6 mb-2 rounded-lg bg-blue-700 px-5 py-2.5 
        text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4'
          >
            Add Student
          </Link>
        </div>
        <div className='relative mt-6 overflow-x-auto shadow-md sm:rounded-lg'>
          <table className='w-full text-left text-sm text-gray-500 dark:text-gray-400'>
            <thead className='bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400'>
              <tr>
                <th scope='col' className='py-3 px-6'>
                  #
                </th>
                {/* <th scope='col' className='py-3 px-6'>
                  Avatar
                </th> */}
                <th scope='col' className='py-3 px-6'>
                  Name
                </th>
                <th scope='col' className='py-3 px-6'>
                  Email
                </th>
                <th scope='col' className='py-3 px-6'>
                  <span className='sr-only'>Action</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((student) => (
                <tr
                  key={student.ID}
                  onMouseEnter={() => {}}
                  className='border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600'
                >
                  <td className='py-4 px-6'>{student.ID}</td>
                  {/* <td className='py-4 px-6'>
                    <img src={student.Name} alt={student.Name} className='h-5 w-5' />
                  </td> */}
                  <th scope='row' className='whitespace-nowrap py-4 px-6 font-medium text-gray-900 dark:text-white'>
                    {student.Name}
                  </th>
                  <td className='py-4 px-6'>{student.Email}</td>
                  <td className='py-4 px-6 text-right'>
                    <Link
                      to={`/students/${student.ID}`}
                      className='mr-5 font-medium text-blue-600 hover:underline dark:text-blue-500'
                    >
                      Edit
                    </Link>
                    <button className='font-medium text-red-600 dark:text-red-500'>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
