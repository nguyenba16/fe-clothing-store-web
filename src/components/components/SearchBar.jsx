import { InputAdornment, TextField } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

export default function SearchBar({ handleSubmit, handleChangeSearch, searchValue }) {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit()
    }
  }
  return (
    <div>
      <TextField
        value={searchValue}
        onChange={handleChangeSearch}
        fullWidth
        placeholder={'Tìm kiếm tên món...'}
        className='bg-white rounded-[10px] outline-none'
        autoFocus
        onKeyDown={handleKeyDown}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <FontAwesomeIcon icon={faSearch} style={{ color: '#000' }} size='xl' />
            </InputAdornment>
          ),
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
            borderRadius: '10px',
            '&.Mui-focused fieldset': {
              borderColor: '#fff',
            },
            '& .MuiInputBase-input': {
              paddingLeft: '10px',
            },
          },
          '@media (max-width: 768px)': {
            '& .MuiOutlinedInput-root': {
              height: '40px',
              boxShadow: 'none',
            },
          },
        }}
      />
    </div>
  )
}
