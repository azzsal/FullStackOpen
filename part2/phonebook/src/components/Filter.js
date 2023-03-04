const Filter = ({ searchKey, handler }) => {
  return (
    <div>
      filter shown with <input value={searchKey} onChange={handler} />
    </div>
  )
}

export default Filter