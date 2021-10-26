export const customStyles = {
  content: {
    top: "45%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: 0,
    border: "none",
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
    width: "40%",
    borderRadius: "12px",
    minWidth: "800px",
  },
};

export const pModalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: 0,
    border: "none",
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
    width: "500px",
    opacity: 1,
    borderRadius: "12px",
  },
};

export const getRegion = (regionId) => {
  switch (regionId) {
    case "61765ca5c5017731f38c396f":
      return "NCR";
      break;

    default:
  }
};

// export const getMunicipality = (id) => {
//   switch(id){
//     case:
//   }
// }
