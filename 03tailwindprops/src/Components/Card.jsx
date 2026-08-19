import React from 'react'
// function Card(props) {  // in cards we Can use props to pass data from parent component to child component. 
//     console.log(props)
//     console.log(props.channel)  // props.anthing is used to access the data passed from the parent component.
//     console.log(props.someobj)
//     console.log(props.somearray)


// Instead OF props we can use directly the name of the prop in the function parameter. This is called destructuring.
function Card({ username="Guest", channel="Default value", someobj, somearray }) {  // in cards we Can use props to pass data from parent component to child component. 
    console.log(username)
    console.log(channel)
    console.log(someobj)
    console.log(somearray)
    return (
           <div className="min-h-screen bg-gray-900 flex items-center justify-center p-6">
  <div className="bg-white rounded-2xl shadow-xl p-8 max-w-sm w-full">
    <span className="inline-block bg-indigo-100 text-indigo-600 text-xs font-semibold px-3 py-1 rounded-full mb-4">
      New
    </span>

    <h1 className="text-2xl font-bold text-gray-900 mb-2">
      Welcome <h1 className="text-indigo-600">{username}</h1>  {/* we can use props to display the data passed from the parent component. */}
    </h1>

    <p className="text-gray-500 text-sm mb-6">
      Sign in to continue building something great.
    </p>

    <div className="flex flex-col gap-3 mb-6">
      <input
        type="email"
        placeholder="Email address"
        className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <input
        type="password"
        placeholder="Password"
        className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>

    <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition-colors">
      Sign In
    </button>

    <p className="text-center text-xs text-gray-400 mt-4">
      Don't have an account? <span className="text-indigo-600 font-medium cursor-pointer">Sign up</span>
    </p>
  </div>
</div>
    )

} 


export default Card