<template>
    <div>
        <div v-if="rating == 0">
                        <v-icon>mdi-star-outline</v-icon>
                        <v-icon>mdi-star-outline</v-icon>
                        <v-icon>mdi-star-outline</v-icon>
                        <v-icon>mdi-star-outline</v-icon>
                        <v-icon>mdi-star-outline</v-icon>

        </div>
        <div v-if="rating >= 0.5 && rating<1">
            <v-icon color="yellow" >mdi-star-half</v-icon>
                        <v-icon>mdi-star-outline</v-icon>
                        <v-icon>mdi-star-outline</v-icon>
                        <v-icon>mdi-star-outline</v-icon>
                        <v-icon>mdi-star-outline</v-icon>
        </div>
        <div v-if="rating == 1">
            <v-icon color="yellow" >mdi-star</v-icon>
                        <v-icon >mdi-star-outline</v-icon>
                        <v-icon>mdi-star-outline</v-icon>
                        <v-icon>mdi-star-outline</v-icon>
                        <v-icon>mdi-star-outline</v-icon>
        </div>
        <div v-if="rating >= 1.5 && rating<2">
            <v-icon color="yellow" >mdi-star</v-icon>
                        <v-icon color="yellow">mdi-star-half</v-icon>
                        <v-icon>mdi-star-outline</v-icon>
                        <v-icon>mdi-star-outline</v-icon>
                        <v-icon>mdi-star-outline</v-icon>
        </div>
        <div v-if="rating == 2">
            <v-icon color="yellow" >mdi-star</v-icon>
                        <v-icon color="yellow">mdi-star</v-icon>
                        <v-icon>mdi-star-outline</v-icon>
                        <v-icon>mdi-star-outline</v-icon>
                        <v-icon>mdi-star-outline</v-icon>
        </div>
        <div v-if="rating >= 2.5 && rating<3">
            <v-icon  color="yellow">mdi-star</v-icon>
                        <v-icon color="yellow">mdi-star</v-icon>
                        <v-icon color="yellow">mdi-star-half</v-icon>
                        <v-icon>mdi-star-outline</v-icon>
                        <v-icon>mdi-star-outline</v-icon>
        </div>
        <div v-if="rating == 3">
            <v-icon color="yellow" >mdi-star</v-icon>
                        <v-icon color="yellow">mdi-star</v-icon>
                        <v-icon color="yellow">mdi-star</v-icon>
                        <v-icon>mdi-star-outline</v-icon>
                        <v-icon>mdi-star-outline</v-icon>
        </div>
        <div v-if="rating >= 3.5 && rating<4">
            <v-icon color="yellow" >mdi-star</v-icon>
                        <v-icon color="yellow">mdi-star</v-icon>
                        <v-icon color="yellow">mdi-star</v-icon>
                        <v-icon color="yellow">mdi-star-half</v-icon>
                        <v-icon>mdi-star-outline</v-icon>
        </div>
        <div v-if="rating == 4">
            <v-icon color="yellow" >mdi-star</v-icon>
                        <v-icon color="yellow">mdi-star</v-icon>
                        <v-icon color="yellow">mdi-star</v-icon>
                        <v-icon color="yellow">mdi-star</v-icon>
                        <v-icon >mdi-star-outline</v-icon>
        </div>
        <div v-if="rating >= 4.5 && rating<5">
            <v-icon color="yellow" >mdi-star</v-icon>
                        <v-icon color="yellow" >mdi-star</v-icon>
                        <v-icon color="yellow">mdi-star</v-icon>
                        <v-icon  color="yellow"  >mdi-star</v-icon>
                        <v-icon color="yellow" >mdi-star-half</v-icon>
        </div>
        <div v-if="rating == 5">
            <v-icon color="yellow" >mdi-star</v-icon>
                        <v-icon color="yellow">mdi-star</v-icon>
                        <v-icon color="yellow">mdi-star</v-icon>
                        <v-icon color="yellow">mdi-star</v-icon>
                        <v-icon  color="yellow">mdi-star</v-icon>
        </div>

                        
    </div>
</template>
<script>
export default {
    name:'rate-star',
    props:['rating']
}
</script>