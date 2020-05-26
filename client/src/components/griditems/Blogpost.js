import React from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'


const Blogpost = (props) => {

    const setSelectedBlog = () => {
        console.log(props)
        props.onSelectBlog(props.blogpost)
    }

    return (
        <div>
            {props.blogpost ? (
                <Card>
                    <CardContent>
                        <Typography gutterbutton="true" variant="h5" component="h2">
                            {props.blogpost.title}
                        </Typography>
                        <Typography gutterbutton="true" component="p">
                            {props.blogpost.date}
                        </Typography>
                        <Typography gutterbutton="true" component="p">
                            {props.blogpost.blogpost}
                        </Typography>
                        <CardActions>
                            <Button size='small' color="primary" onClick={setSelectedBlog}>
                                Open Post
                            </Button>
                        </CardActions>
                    </CardContent>
                </Card>
            ) : null}
        </div>

    )
}

export default Blogpost;