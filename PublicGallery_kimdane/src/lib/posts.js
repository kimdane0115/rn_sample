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

export async function getPosts({userId, mode, id} = {}) {
    let query = postsCollection.orderBy('createdAt', 'desc').limit(PAGE_SIZE);
    if (userId) {
        query = query.where('user.id', '==', userId);
    }

    if (id) {
        const cursorDoc = await postsCollection.doc(id).get();
        query = mode === 'older' ? query.startAfter(cursorDoc) : query.endBefore(cursorDoc);
    }

    const snapshot = await query.get();

    const posts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
    return posts;
}

// 특정 포스트 이전에 작성한 포스트를 불러오는 함수
export async function getOlderPosts(id, userId) {
    return getPosts({
        id,
        mode: 'older',
        userId,
    });
}

// 최근 작성한 포스트 불러오기
export async function getNewerPosts(id, userId) {
    return getPosts({
        id,
        mode: 'newer',
        userId,
    });
}