import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

const Navbar = () => {
    return (
        <div >
            <AppBar positiion="static">
                <Toolbar>
                    <Typography variant="h4" color="inherit">
                        Blogs
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Navbar
