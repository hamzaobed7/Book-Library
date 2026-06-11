import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";


export default function AutoComplete({ placeholderText, isDeleting, options, selectedItems, setSelectedItems, getOptionLabelFunc }) {
  return (
    <div style={{ width: "100%", marginBottom: "25px" }}>
      <label style={{ display: "block", fontSize: "14px", color: "#4a5568", marginBottom: "5px", textAlign: "left" }}>
        Select Items (Multiple):
      </label>
      <Autocomplete
        multiple
        disabled={isDeleting}
        options={options || []} 
        value={selectedItems}
        onChange={(event, newValue) => {
          setSelectedItems(newValue); 
        }}
        getOptionLabel={getOptionLabelFunc}
        isOptionEqualToValue={(option, value) => option?.id === value?.id}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            
            placeholder={selectedItems.length === 0 ? placeholderText : ""}
            sx={{
              backgroundColor: "#fff",
              width: "100%", 
              "& .MuiOutlinedInput-root": {
                borderRadius: "6px",
                padding: "5px",
                fontFamily: "inherit",
              },
            }}
          />
        )}
      />
    </div>
  );
}