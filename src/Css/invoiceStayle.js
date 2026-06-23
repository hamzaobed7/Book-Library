
export const invoiceStyles = {
  container: {
    width:"100%",
    my: 4,
    backgroundColor:"#ffff",
    padding:'30px'
  },
  actionBox: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    mb: 3,
    '@media print': { display: 'none' },
  },
  paper: {
    p: 5,
    borderRadius: 3,
    position: 'relative',
    boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.05)',
    '@media print': {
      boxShadow: 'none',
      p: 0,
      m: 0,
    },
  },
  statusChip: {
    position: 'absolute',
    top: 30,
    right: 30, 
    fontWeight: 'bold',
    fontSize: '0.9rem',
    '@media print': { top: 10, right: 10 },
  },
  tableHead: {
    backgroundColor: '#f8f9fa',
    '@media print': {
      backgroundColor: '#f8f9fa !important',
      WebkitPrintColorAdjust: 'exact',
    },
  },
  tableHeaderCell: {
    fontWeight: 'bold',
    color: 'text.secondary',
  },
  summaryWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    mt: 4,
  },
  summaryBox: {
    width: '280px',
  },
  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    mb: 1.5,
  },
  footerText: {
    mt: 6,
    pt: 2,
    borderTop: '1px solid #eee',
    color: 'text.secondary',
    textAlign: 'center',
  },
  cancelArea: {
    mt: 4,
    display: 'flex',
    justifyContent: 'center',
    '@media print': { display: 'none' }, 
  }
};