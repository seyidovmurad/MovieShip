
export const movieTable = [
    { field: "_id", headerName: "ID", width: 70 },
    {
      field: "name",
      headerName: "Title",
      width: 230,
      autoHeight: true,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            <img className="cellImg" src={params.row.cover_link} alt="avatar" />
            {params.row.name}
          </div>
        );
      },
    },
    {
      field: "year",
      headerName: "Release year",
      minWidth: 50,
    },
  
    {
      field: "duration",
      headerName: "Duration",
      minWidth: 50
    },
    {
        field: "country",
        headerName: "Countries",
        width: 190,
    },
    {
        field: 'genre',
        headerName: 'Genres',
        width: 250,
        valueGetter: getGenres
    },
]

function getGenres(genre) {
    return genre?.value?.map(g => g.name).join()
}

export const genreTable = [
  { field: "_id", headerName: "ID", width: 170 },
  {
    field: "name",
    headerName: "Name",
    width: 190,
  },
]