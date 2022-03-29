import IconButton from '@mui/material/IconButton';
import Add from '@mui/icons-material/Add';
import Done from '@mui/icons-material/Done';
import React, { useContext, useEffect, useState } from "react"
import { WidgetCreator } from './WidgetCreator';
import { UserContext } from '../providers/UserProvider';
import { Box } from '@mui/system';
import { TextField, Typography } from '@mui/material';

export function Creator() {
    const user = useContext(UserContext);
    const [action, setAction] = useState('')
    const [A_arg1, setA_arg1] = useState('')
    const [A_arg2, setA_arg2] = useState('')
    const [A_arg3, setA_arg3] = useState('')

    const [reaction, setReaction] = useState('')
    const [R_arg1, setR_arg1] = useState('')
    const [R_arg2, setR_arg2] = useState('')
    const [R_arg3, setR_arg3] = useState('')

    const doAddAction = () => {
        window.open('http://localhost:8080/add/action', "_blank", "resizable=no, location=no, toolbar=no, menubar=no, width=1000, height=900, top=100, left=200")
    }

    const doAddReaction = () => {
        window.open('http://localhost:8080/add/reaction', "_blank", "resizable=no, location=no, toolbar=no, menubar=no, width=1000, height=900, top=100, left=200")
    }

    const handleChanges = (e) => {
        switch (e.currentTarget.id) {
            case 'A0':
                setA_arg1(e.currentTarget.value);
                break
            case 'A1':
                setA_arg2(e.currentTarget.value);
                break
            case 'A2':
                setA_arg3(e.currentTarget.value);
                break
            case 'R0':
                setR_arg1(e.currentTarget.value);
                break
            case 'R1':
                setR_arg2(e.currentTarget.value);
                break
            case 'R2':
                setR_arg3(e.currentTarget.value);
                break
            default:
                break;
        }
    }

    const confirmCreation = (action, reaction) => {
        //alert('Action: ' + action.id + '\n' + A_arg1 + '\n' + A_arg2 + '\n' + A_arg3 + '\nReaction: ' + reaction.id + '\n' + R_arg1 + '\n' + R_arg2 + '\n' + R_arg3)
        var result = { action: action.id, argsA: [A_arg1, A_arg2, A_arg3], reaction: reaction.id, argsR: [R_arg1, R_arg2, R_arg3] }
        result = JSON.stringify(result, Object.keys(result).sort());
        WidgetCreator(user, result, window.callback);
    }

    function displayAArgs(args) {
        if (!args)
            return
        var arr = args.map((arg, index) => arg = (<TextField sx={{ marginBottom: 2, input: { backgroundColor: 'white', borderRadius: 2, color: 'black' } }} id={'A' + index} label={arg.name} variant="outlined" key={index} onChange={(e) => { handleChanges(e) }} />));
        return arr
    }
    function displayRArgs(args) {
        if (!args)
            return
        var arr = args.map((arg, index) => arg = (<TextField sx={{ marginBottom: 2, input: { backgroundColor: 'white', borderRadius: 2, color: 'black' } }} id={'R' + index} label={arg.name} variant="outlined" key={index} onChange={(e) => { handleChanges(e) }} />));
        return arr
    }

    useEffect(() => {
        window.addEventListener('message', event => {
            if (event.origin.startsWith('http://localhost:8080') && event.data) {
                var content = JSON.parse(event.data)
                if (!content.error && content.action) {
                    setAction(content.action)
                }
                else if (!content.error && content.reaction) {
                    setReaction(content.reaction)
                }
                else
                    alert('Error: ' + content.error_description)
            } else {
                return;
            }
        });
    }, [])


    return (
        <div>
            <center>
                {action ?
                    <div>
                        <Box sx={{ backgroundColor: "#000000", color: '#FFFFFF', padding: 10, marginBottom: 2 }}>
                            {action.service.charAt(0).toUpperCase() + action.service.slice(1)}
                            <Typography variant="h4" >
                                {action.name}
                            </Typography>

                            <br />
                            <Typography variant="h5" >
                                {action.description}
                            </Typography>
                            <br />
                        </Box>
                        <center>
                            <Box sx={{ paddingLeft: 3, paddingRight: 3, display: 'flex', flexDirection: 'column' }}>
                                {displayAArgs(action.args)}
                            </Box>
                        </center>
                    </div>
                    : <IconButton onClick={() => doAddAction()}>
                        <Add />
                    </IconButton>}
                <br />
                {reaction ?
                    <div>
                        <Box sx={{ backgroundColor: "#000000", color: '#FFFFFF', padding: 10, marginBottom: 2 }}>
                            <Typography variant="h4" >
                                {reaction.name}
                            </Typography>

                            <br />
                            <Typography variant="h5" >
                                {reaction.description}
                            </Typography>
                        </Box>
                        <Box sx={{ paddingLeft: 3, paddingRight: 3, display: 'flex', flexDirection: 'column' }}>
                            {displayRArgs(reaction.args)}
                        </Box>
                    </div>
                    : <IconButton onClick={() => doAddReaction()}>
                        <Add />
                    </IconButton>}
                <br />
                <IconButton onClick={() => { confirmCreation(action, reaction) }}>
                    <Done />
                </IconButton>
            </center>
        </div>
    )
}