<template>
    <div>
        <div v-if="rating == 0">
                        <v-icon :size="size">mdi-star-outline</v-icon>
                        <v-icon :size="size">mdi-star-outline</v-icon>
                        <v-icon :size="size">mdi-star-outline</v-icon>
                        <v-icon :size="size">mdi-star-outline</v-icon>
                        <v-icon :size="size">mdi-star-outline</v-icon>

        </div>
        <div v-if="rating >= 0.5 && rating<1">
            <v-icon :size="size" color="#4E5256" >mdi-star-half</v-icon>
                        <v-icon :size="size">mdi-star-outline</v-icon>
                        <v-icon :size="size">mdi-star-outline</v-icon>
                        <v-icon :size="size">mdi-star-outline</v-icon>
                        <v-icon :size="size">mdi-star-outline</v-icon>
        </div>
        <div v-if="rating >= 1 && rating < 1.5">
            <v-icon  :size="size" color="#4E5256" >mdi-star</v-icon>
                        <v-icon :size="size" >mdi-star-outline</v-icon>
                        <v-icon :size="size">mdi-star-outline</v-icon>
                        <v-icon :size="size">mdi-star-outline</v-icon>
                        <v-icon :size="size">mdi-star-outline</v-icon>
        </div>
        <div v-if="rating >= 1.5 && rating<2">
            <v-icon  :size="size" color="#4E5256" >mdi-star</v-icon>
                        <v-icon :size="size" color="#4E5256">mdi-star-half</v-icon>
                        <v-icon :size="size">mdi-star-outline</v-icon>
                        <v-icon :size="size">mdi-star-outline</v-icon>
                        <v-icon :size="size">mdi-star-outline</v-icon>
        </div>
        <div v-if="rating >= 2 && rating < 2.5">
            <v-icon  :size="size" color="#4E5256" >mdi-star</v-icon>
                        <v-icon :size="size"  color="#4E5256">mdi-star</v-icon>
                        <v-icon :size="size">mdi-star-outline</v-icon>
                        <v-icon :size="size">mdi-star-outline</v-icon>
                        <v-icon :size="size">mdi-star-outline</v-icon>
        </div>
        <div v-if="rating >= 2.5 && rating<3">
            <v-icon  :size="size"  color="#4E5256">mdi-star</v-icon>
                        <v-icon  :size="size" color="#4E5256">mdi-star</v-icon>
                        <v-icon  :size="size" color="#4E5256">mdi-star-half</v-icon>
                        <v-icon :size="size">mdi-star-outline</v-icon>
                        <v-icon :size="size">mdi-star-outline</v-icon>
        </div>
        <div v-if="rating >= 3 && rating < 3.5">
            <v-icon :size="size" color="#4E5256" >mdi-star</v-icon>
                        <v-icon  :size="size" color="#4E5256">mdi-star</v-icon>
                        <v-icon  :size="size" color="#4E5256">mdi-star</v-icon>
                        <v-icon :size="size">mdi-star-outline</v-icon>
                        <v-icon :size="size">mdi-star-outline</v-icon>
        </div>
        <div v-if="rating >= 3.5 && rating<4">
            <v-icon  :size="size" color="#4E5256" >mdi-star</v-icon>
                        <v-icon  :size="size" color="#4E5256">mdi-star</v-icon>
                        <v-icon  :size="size" color="#4E5256">mdi-star</v-icon>
                        <v-icon  :size="size" color="#4E5256">mdi-star-half</v-icon>
                        <v-icon :size="size">mdi-star-outline</v-icon>
        </div>
        <div v-if="rating >= 4 && rating < 4.5">
            <v-icon  :size="size" color="#4E5256" >mdi-star</v-icon>
                        <v-icon :size="size"  color="#4E5256">mdi-star</v-icon>
                        <v-icon :size="size" color="#4E5256">mdi-star</v-icon>
                        <v-icon :size="size"  color="#4E5256">mdi-star</v-icon>
                        <v-icon :size="size" >mdi-star-outline</v-icon>
        </div>
        <div v-if="rating >= 4.5 && rating<5">
            <v-icon :size="size"  color="#4E5256" >mdi-star</v-icon>
                        <v-icon :size="size"  color="#4E5256" >mdi-star</v-icon>
                        <v-icon :size="size"  color="#4E5256">mdi-star</v-icon>
                        <v-icon  :size="size" color="#4E5256"  >mdi-star</v-icon>
                        <v-icon  :size="size" color="#4E5256" >mdi-star-half</v-icon>
        </div>
        <div v-if="rating == 5">
            <v-icon color="#4E5256" >mdi-star</v-icon>
                        <v-icon :size="size"  color="#4E5256">mdi-star</v-icon>
                        <v-icon  :size="size" color="#4E5256">mdi-star</v-icon>
                        <v-icon  :size="size" color="#4E5256">mdi-star</v-icon>
                        <v-icon  :size="size"  color="#4E5256">mdi-star</v-icon>
        </div>

                        
    </div>
</template>
<script>
export default {
    name:'rate-star',
    props:['rating','size']
}
</script>