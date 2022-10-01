
  export const movieInputs = [
    {
      id: "name",
      element: "input",
      label: "Movie Title",
      type: "text",
      placeholder: "The Dark Knight",
      error: "Name cannot be empty."
    },
    {
      id: "year",
      element: "select",
      label: "Release Year",
      type: "year",
      placeholder: "2022",
    },
    {
      id: "duration",
      element: "input",
      label: "Duration",
      type: "number",
      placeholder: "180"
    },
    {
      id: "country",
      element: "input",
      label: "Country",
      type: "text",
      placeholder: "USA",
    },
    {
      id: "cover_link",
      element: "input",
      label: "Poster link",
      type: "text",
      placeholder: "https://...",
    },
    {
      id: "source_link",
      element: "input",
      label: "Movie link",
      type: "text",
      placeholder: "https://...",
    },
    {
      id: "trailer_link",
      element: "input",
      label: "Trailer link",
      type: "text",
      placeholder: "https://...",
    },
    {
      id: "genre",
      element: "select",
      multiple: true,
      label: "Genres",
      type: "table",
    },
    {
      id: "description",
      element: "textarea",
      label: "Description",
      placeholder: "Movie description..."
    },
  ];
  

  export const genreInputs = [
    {
      id: "name",
      element: "input",
      label: "Genre Name",
      type: "text",
      placeholder: "Action",
      pattern: "/^([a-zA-Z]){3,15}$/",
      error: "Name should be 3-15 characters and should not inclue special character and number"
    },
  ];
  

