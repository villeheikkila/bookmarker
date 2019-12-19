import React, { SetStateAction } from 'react';
import { Button, Modal, Segment, TransitionablePortal } from 'semantic-ui-react';
import { Article } from '../Articles/Article';
import { Blogpost } from '../Blogs/Blogpost';
import { Book } from '../Books/Book';
import { Video } from '../Videos/Video';

interface ItemModalProps {
    item: any;
    portalOpen: boolean;
    setPortalOpen: React.Dispatch<SetStateAction<boolean>>;
}

export const ItemModal = ({ item, portalOpen, setPortalOpen }: ItemModalProps) => {
    if (item === null) return <></>;
    return (
        <TransitionablePortal open={portalOpen} onClose={() => setPortalOpen(false)}>
            <Modal className="inverted" open={portalOpen} centered={false}>
                <Modal.Header></Modal.Header>
                <Modal.Content>
                    <Segment inverted>
                        {item.type === 'book' ? (
                            <Book {...item} />
                        ) : item.type === 'video' ? (
                            <Video {...item} />
                        ) : item.type === 'article' ? (
                            <Article article={item} />
                        ) : item.type === 'blogpost' ? (
                            <Blogpost blogpost={item} />
                        ) : (
                            <div />
                        )}
                    </Segment>
                    <Button inverted color="green" onClick={() => setPortalOpen(false)}>
                        Close
                    </Button>
                </Modal.Content>
            </Modal>
        </TransitionablePortal>
    );
};
