export default function SelectionItem({selection,handleSelectionChange,isDeleting}){
  
    return(<>
    
    <label style={{ display: "block", fontSize: "14px", color: "#4a5568", marginBottom: "5px", textAlign: "left" }}>Select Type to Delete:</label>
          <select value={selection} onChange={handleSelectionChange} className="Select-form" disabled={isDeleting} style={{ marginBottom: "20px" }}>
            <option value="Author">Authors</option>
            <option value="Book">Books</option>
            <option value="Category">Categories</option>
          </select>
    
    </>)
}