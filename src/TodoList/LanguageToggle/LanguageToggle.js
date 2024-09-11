import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

export function LanguageToggle({ setLanguage, englishLang, arabicLang}) {
    // Handling application language toggle
    function changeLanguage(lang) {
        localStorage.setItem("lang", JSON.stringify(lang));
        setLanguage(lang);
    }
    return (
    <ButtonGroup
        disableElevation
        variant="contained"
        dir="ltr"
        style={{position: "absolute", right: "0"}}
    >
        <Button onClick={() => changeLanguage(englishLang)}>En</Button>
        <Button onClick={() => changeLanguage(arabicLang)}>Ar</Button>
    </ButtonGroup>
    );
}