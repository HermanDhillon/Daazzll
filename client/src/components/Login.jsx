import { useState } from 'react'
import { redirect } from 'react-router-dom'
import axios from 'axios'

export default function Login() {
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  })

  function handleInput(event) {
    setLoginData({ ...loginData, [event.target.name]: event.target.value })
  }

  function handleSubmit(event) {
    event.preventDefault()
    axios({
      method: 'post',
      url: '/api/auth/login',
      data: loginData,
    })
      .then((response) => {
        // setResponse(response.data)
        if (response.data.error) {
          console.log(response.data.error)
        }
        if (response.data.login === 'successful') {
          console.log(response.data)
          return redirect('/settings')
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  return (
    <div className="modal" id="Login">
      <div className="modal-box">
        <a href="#" className="btn btn-sm btn-circle absolute right-2 top-2">
          ✘
        </a>
        <h1 className="text-3xl font-semibold text-center text-gray-700">
          Login
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="Username"
              className="w-full input input-bordered"
              name="username"
              onChange={handleInput}
            />
          </div>
          <div>
            <label className="label">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full input input-bordered"
              name="password"
              onChange={handleInput}
            />
          </div>
          <a
            href="https://media.tenor.com/OoTeyZ1HtIkAAAAC/welp.gif"
            className="text-xs text-gray-600 hover:underline hover:text-blue-600"
          >
            Forgot Password?
          </a>
          <div>
            <button type="submit" className="btn btn-primary btn-block">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
