import firestore from '@react-native-firebase/firestore';

const postsCollection = firestore().collection('posts');
export const PAGE_SIZE = 3;

export function createPost({user, photoURL, description}) {
    return postsCollection.add({
        user,
        photoURL,
        description,
        createdAt: firestore.FieldValue.serverTimestamp(),
    });
}

export async function getPosts(userId) {
    let query = postsCollection.orderBy('createdAt', 'desc').limit(PAGE_SIZE);
    if (userId) {
        query = query.where('user.id', '==', userId);
    }
    const snapshot = await query.get();
    //const snapshot = await postsCollection.orderBy('createdAt', 'desc').limit(PAGE_SIZE).get();
    // const snapshot = await postsCollection.orderBy('createdAt', 'desc').get();
    // const snapshot = await postsCollection.get();

    const posts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
    return posts;
}

// 특정 포스트 이전에 작성한 포스트를 불러오는 함수
export async function getOlderPosts(id, userId) {
    const cursorDoc = await postsCollection.doc(id).get();
    let query = postsCollection
    .orderBy('createdAt', 'desc')
    .startAfter(cursorDoc)
    .limit(PAGE_SIZE);

    if (userId) {
        query = query.where('user.id', '==', userId);
    }
    const snapshot = await query.get();
    // const snapshot = await postsCollection
    // .orderBy('createdAt', 'desc')
    // .startAfter(cursorDoc)
    // .limit(PAGE_SIZE)
    // .get();

    const posts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
    return posts;
}

// 최근 작성한 포스트 불러오기
export async function getNewerPosts(id, userId) {
    const cursorDoc = await postsCollection.doc(id).get();
    let query = postsCollection
    .orderBy('createdAt', 'desc')
    .endBefore(cursorDoc)
    .limit(PAGE_SIZE);

    if (userId) {
        query = query.where('user.id', '==', userId);
    }

    const snapshot = await query.get();
    // const snapshot = await postsCollection
    // .orderBy('createdAt', 'desc')
    // .endBefore(cursorDoc)
    // .limit(PAGE_SIZE)
    // .get();

    const posts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
    return posts;
}