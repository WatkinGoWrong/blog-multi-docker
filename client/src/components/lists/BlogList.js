import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Blogpost from '../griditems/Blogpost'
import axios from 'axios';


class BlogList extends Component {
    state = {
        blogs: [],
        searchString: '',
        selectedBlog: null
    }

    constructor() {
        super()
        this.getBlogs()
    };

    async getBlogs() {
        const returnedblogs = await axios.get('/api/values/all');
        console.log('TEST : ' + returnedblogs)
        this.setState({ blogs: returnedblogs.data });
    }

    setSelectedBlog = (blogpost) => {
        this.setState({ selectedBlog: blogpost });
    }


    clearSelectedBlog = () => {
        this.setState({ selectedBlog: null });
    }

    onSearchInputChange = (event) => {
        if (event.target.value) {
            this.setState({ searchString: event.target.value })
        } else {
            this.setState({ searchString: '' })
        }
        this.getBlogs()
    }

    render() {
        return (
            <div>
                {(this.state.blogs && this.state.selectedBlog == null) ? (
                    <div>
                        <TextField style={{ padding: 24 }}
                            id="searchInput"
                            placeholder="Search for Blogs"
                            margin="normal"
                            onChange={this.onSearchInputChange} />
                        <Grid container spacing={10} style={{ padding: 24 }}>
                            {this.state.blogs.map(currentBlogpost => (
                                <Grid item xs={12} sm={6} lg={4} xl={3}>
                                    <Blogpost blogpost={currentBlogpost} onSelectBlog={this.setSelectedBlog} />
                                </Grid>
                            ))}
                        </Grid>
                    </div>
                ) : <Blogpost blogpost={this.state.selectedBlog} onSelectBlog={this.setSelectedBlog} />}
            </div>
        )
    }
}
export default BlogList;
