import React, { useState } from 'react';
import './App.css';

function Header({ onChangeMode, children }) {
    return <h1 onClick={() => onChangeMode()}>{children}</h1>;
}

function Article({ title, content, likes, comments, onLike, onAddComment }) {
    return (
        <article>
            <h2>{title}</h2>
            <p>{content}</p>
            <p>Likes: {likes}</p>
            <button onClick={onLike}>💚 Like</button>
            <Comment comments={comments} onAddComment={onAddComment} />
        </article>
    );
}

function Comment({ comments, onAddComment }) {
    const [newComment, setNewComment] = useState('');

    const handleAddComment = () => {
        onAddComment(newComment);
        setNewComment('');
    };

    return (
        <div>
            <h3>💬댓글</h3>
            <ul>
                {comments.map((comment, index) => (
                    <li key={index}>{comment}</li>
                ))}
            </ul>
            <input
                type="text"
                placeholder="Add a comment"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
            />
            <button onClick={handleAddComment}>댓글 달기</button>
        </div>
    );
}

function Nav({ onChangeMode, list }) {
    return (
        <nav>
            <ol>
                {list.map((item) => (
                    <li key={item.id} onClick={() => onChangeMode(item.id)}>
                        <div>🌻 {item.title}</div>
                    </li>
                ))}
            </ol>
        </nav>
    );
}

function App() {
    const [mode, setMode] = useState('HOME');
    const [id, setId] = useState(-1);

    const [list, setList] = useState([
        { id: 0, title: '이름', content: '김소윤', likes: 0, comments: [] },
        { id: 1, title: '생년월일', content: '2003.02.11', likes: 0, comments: [] },
        { id: 2, title: '학력', content: '고려대학교 융합에너지공학과', likes: 0, comments: [] },
    ]);

    let title = '제목 없음';
    let content = '내용 없음';
    let likes = 0;
    let comments = [];

    if (mode === 'HOME') {
        title = '인사';
        content = '안녕하세요. 저의 소개 페이지에 온 것을 환영합니다~!';
    } else if (mode === 'READ' && id !== -1) {
        title = list[id].title;
        content = list[id].content;
        likes = list[id].likes;
        comments = list[id].comments;
    }

    const handleCreate = (title, content) => {
        setList([...list, { title, content, id: list.length, likes: 0, comments: [] }]);
        setMode('READ');
        setId(list.length);
    };

    const handleUpdate = (title, content) => {
        setList(list.map((item) => (item.id === id ? { ...item, title, content } : item)));
        setMode('READ');
    };

    const handleDelete = () => {
        setList(list.filter((item) => item.id !== id));
        setMode('HOME');
        setId(-1);
    };

    const handleLike = () => {
        setList(list.map((item) => (item.id === id ? { ...item, likes: item.likes + 1 } : item)));
    };

    const handleAddComment = (comment) => {
        setList(list.map((item) => (item.id === id ? { ...item, comments: [...item.comments, comment] } : item)));
    };

    return (
        <>
            <Header onChangeMode={() => setMode('HOME')}>☘️ ABOUT ME ☘️</Header>
            <Nav
                list={list}
                onChangeMode={(_id) => {
                    setMode('READ');
                    setId(_id);
                }}
            />
            <Article
                title={title}
                content={content}
                likes={likes}
                comments={comments}
                onLike={handleLike}
                onAddComment={handleAddComment}
            />
            {mode === 'CREATE' && <Create onCreate={handleCreate} />}
            {mode === 'HOME' && <button onClick={() => setMode('CREATE')}>글 생성</button>}
            {mode === 'READ' && (
                <>
                    <button onClick={() => setMode('UPDATE')}>글 수정</button>
                    <button onClick={handleDelete}>글 삭제</button>
                </>
            )}
            {mode === 'UPDATE' && <Update onUpdate={handleUpdate} item={list.find((item) => item.id === id)} />}
        </>
    );
}

function Create({ onCreate }) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const handleClick = () => {
        onCreate(title, content);
        setTitle('');
        setContent('');
    };

    return (
        <div>
            <p>
                <input type="text" placeholder="title" value={title} onChange={(e) => setTitle(e.target.value)} />
            </p>
            <p>
                <textarea placeholder="content" value={content} onChange={(e) => setContent(e.target.value)}></textarea>
            </p>
            <p>
                <button type="button" onClick={handleClick}>
                    생성
                </button>
            </p>
        </div>
    );
}

function Update({ onUpdate, item }) {
    const [title, setTitle] = useState(item.title);
    const [content, setContent] = useState(item.content);
    const handleClick = () => {
        onUpdate(title, content);
    };

    return (
        <div>
            <p>
                <input type="text" placeholder="title" value={title} onChange={(e) => setTitle(e.target.value)} />
            </p>
            <p>
                <textarea placeholder="content" value={content} onChange={(e) => setContent(e.target.value)}></textarea>
            </p>
            <p>
                <button type="button" onClick={handleClick}>
                    수정
                </button>
            </p>
        </div>
    );
}

export default App;
