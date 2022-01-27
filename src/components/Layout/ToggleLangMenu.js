import React                 from 'react';
import Tooltip               from '@material-ui/core/Tooltip';
import Button                from '@material-ui/core/Button';
import Menu                  from '@material-ui/core/Menu';
import MenuItem              from '@material-ui/core/MenuItem';
import {makeStyles}          from '@material-ui/core/styles';
import TranslateIcon         from '@material-ui/icons/Translate';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import {useTranslation}      from 'react-i18next';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    buttonWhite: {
        color: 'white'
    },
    buttonBlack: {
        color: 'black',
        textTransform: 'none'
    },
    paper: {
        marginRight: theme.spacing(2),
    },
}));

const languages = [
    {
        id: 'en',
        desc: 'English'
    },
    {
        id: 'id',
        desc: 'Bahasa'
    }
];

const MenuListComposition = (props) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const {i18n} = useTranslation();
    const [office, setOffice] = React.useState('');
    const handleToggle = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    // const shortCurrentLng = localStorage.getItem('simpool-lng') ?? "en";

    const currentLng = languages.find(lng => lng.id === (localStorage.getItem('bizzapps-lng') ?? "en"));

    const handleChange = lng => {
        try {
            handleClose();
            i18n.changeLanguage(lng);
            localStorage.setItem('bizzapps-lng', lng);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={classes.root}>
             {/* <Button
                className={props.onMenu ? classes.buttonWhite : classes.buttonBlack}
                // ref={anchorRef}
                aria-controls={'simple-menu'}
                aria-haspopup="true"
                // onClick={handleToggle}
            >
                {office}
            </Button> */}
            <Tooltip title={i18n.t('label_CHANGE_LANGUAGE')}>
                <Button
                    className={props.onMenu ? classes.buttonWhite : classes.buttonBlack}
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={handleToggle}
                    disabled={props.disabled}
                >
                    {props.onMenu ? <TranslateIcon/> : null}
                    {props.onMenu ? currentLng.id.toUpperCase() : currentLng.desc}
                    <KeyboardArrowDownIcon/>
                </Button>
            </Tooltip>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {
                    languages.map((lng, idx) => {
                        return <MenuItem key={idx} onClick={() => handleChange(lng.id)}>{lng.desc}</MenuItem>
                    })
                }
            </Menu>
        </div>
    );
};

MenuListComposition.defaultProps = {
    disabled: false
};

export default MenuListComposition;

