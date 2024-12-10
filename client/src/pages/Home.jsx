import { KeyIcon, ShieldCheck, Key, RefreshCw } from 'lucide-react'
import React from 'react'
import { NavLink } from 'react-router-dom'

function Home() {
  return (
    <>
      <div className="flex justify-center items-center mt-36">
        <div className="border rounded-md w-full max-w-sm p-6 grid gap-6">
          <div className="flex items-center gap-4">
            <div className="bg-primary rounded-md flex items-center justify-center aspect-square w-12">
              <KeyIcon className="text-textColor" />
            </div>
            <h3 className="text-xl font-semibold">Password Manager</h3>
          </div>
          <p className="text-muted-foreground">
            Securely store and manage all your passwords in one place. Generate strong, unique passwords and never forget
            them again.
          </p>
          <div className="flex justify-end">
            <NavLink to="/register">
              <button className="bg-primary p-3 w-28 text-textColor rounded-md">Get Started</button>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home