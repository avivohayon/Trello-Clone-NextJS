import { Card, List } from "@prisma/client";
import React from "react";
import Webcam from "react-webcam";

export type ListWithCards = List & { cards: Card[] };

export type CardWithList = Card & { list: List };


interface GenericVideoMethods<T= {}> {
    customMethods? :T
}
export type WebcamRef<T= {}> = React.RefObject<HTMLVideoElement> & React.RefObject<GenericVideoMethods>;

// export type ListWithTests = List 