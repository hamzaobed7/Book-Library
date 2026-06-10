import Autocomplete from "@mui/material/Autocomplete"
import TextField from "@mui/material/TextField"
export default function AutoComplete({isDeleting,options,selectedItems,setSelectedItems,getOptionLabelFunc}){
    return(<>
    <label style={{ display: "block", fontSize: "14px", color: "#4a5568", marginBottom: "5px", textAlign: "left" }}>Select Items (Multiple):</label>
          <Autocomplete
            multiple
            disabled={isDeleting}
            options={options}
            value={selectedItems}
            onChange={(event, newValue) => setSelectedItems(newValue)}
            getOptionLabel={getOptionLabelFunc}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                placeholder={selectedItems.length > 0 ? "" : "ff"}
                sx={{
                  backgroundColor: "#fff",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "6px",
                    padding: "5px",
                    fontFamily: "inherit",
                  },
                }}
              />
            )}
            style={{ marginBottom: "25px" }}
          />
    
    </>)
}