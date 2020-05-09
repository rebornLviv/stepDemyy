<template>
<v-container class="fill-height" fluid>
    <v-row class="wrapper">
        <v-col class="cont">
            <div>
                <img class="photo" :src="course.imageSrc" alt="">
            </div>
            <div class="inform">
                <p class="courseName">{{course.title}}</p>
                <div class="preinfo">
                    <star class="stars" :size="'45px'" :rating="course.rating"></star>
                    <div class="authorD">
                        <div class="author">
                            <p>{{course.author}}</p>
                            <v-icon size="35px">mdi-account</v-icon>
                        </div>

                    </div>
                </div>
                <p class="desc">{{course.description}}</p>

                <v-row>
                    <v-col>
                        <v-btn
                            dark 
                            class="mt-5 courseBtn" 
                            @click="manageCourse">{{ joined ? 'Продовжити' : 'Приєднатися до курсу'}}
                        </v-btn>
                    </v-col>

                </v-row>
            </div>

        </v-col>

    </v-row>

</v-container>
</template>

<script>
import Star from './subComponents/Stars'
export default {

    data() {
        return {
            name: this.$route.path.replace('/courses/', ''),
            id: this.$route.params['id'],
            rating: 0

        }
    },
    components: {
        star: Star
    },
    methods: {
        async manageCourse() {

            console.log('manage')
            let course = this.$route.path.replace('/courses/', '')
            let title = this.course.title.split(' ').join('')

            await this.$store.dispatch('addCourse', {
                course,
                title
            })
            this.$router.push({
                path: '/courses/' + this.$route.path.split('/')[2] + '/' + title
            })

        }
    },
    computed: {
        userId() {
            return this.$store.getters.user.id;
        },
        course() {

            return this.$store.getters.getCourse
        },
        joined() {
            return this.$store.getters.getJoined
        }

    },

    watch: {

        $route(to) {
            console.log('parid', to.params['id'])
            this.$store.dispatch('setCourse', this.$route.path.replace('/courses/', ''))
            this.id = to.params['id']
        }

    },

}
</script>

<style scoped>
.courseBtn {
    width: 100%;
}

.authorD {
    height: 90px;
    display: flex;
    flex-direction: column;
}

.authorD>p {
    margin-bottom: 0px !important;
    text-align: right;
}

.author {
    width: 200px;
    height: 70px;
    border: 1px solid #4E5256;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;

}

.author>p {
    margin-bottom: 0px !important;
    margin-right: 8px;
}

.author>i {
    width: 42px;
    height: 42px;
    border: 1px solid #4E5256;
    border-radius: 100%;
}

.cont {

    display: flex;
    flex-direction: column;
    align-items: center;
}

.photo {

    width: 800px;
    height: 500px;
    border: 1px solid #4E5256;
}

.preinfo {
    height: 90px;
    display: flex;
    justify-content: space-between;
}

.inform {
    width: 800px;
    height: 639px;
}

.courseName {
    font-size: 70px;
    color: #4E5256;
}
</style>
