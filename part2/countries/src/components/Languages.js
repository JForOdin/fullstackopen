const Languages = (languages) => {
    let langArray = Object.values(languages.languages);
    return (
      <div>
          Languages:
        {langArray.map((language)=><div key ={language}> {language}</div>)}
      </div>
    )
  }

  export default Languages;