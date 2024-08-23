
export default function Card(props:any) {

  console.log(props)
  return (
    <div className="card bg-neutral text-neutral-content w-full max-w-xs m-4 border rounded-lg shadow-sm">
        <div className="card-body p-3">
            <h2 className="card-title text-lg font-semibold mb-2">Offer</h2>
            <div className="text-sm mb-3">
                <p><strong>User: </strong>{props.data.user}</p>
                <p><strong>From: </strong>{props.data.from}</p>
                <p><strong>To: </strong>{props.data.to}</p>
                <p><strong>Amount: </strong><span className="font-semibold">{props.data.amount}</span></p>
            </div>

            <div className="card-actions flex justify-between">
                <button className="btn btn-error text-white text-xs font-semibold py-1 px-3 rounded-md transition-transform transform hover:scale-105">Accept</button>
                <button className="btn btn-white border border-gray-300 text-white-700 text-xs font-semibold py-1 px-3 rounded-md transition-transform transform hover:scale-105">Deny</button>
            </div>
        </div>
    </div>
  )
}
