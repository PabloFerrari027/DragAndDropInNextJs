import type { NextPage } from 'next'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult
} from 'react-beautiful-dnd'

import data from '../data/fakeDB.json'

import styles from '../styles/Home.module.css'

interface ResultPokemons {
  id: number
  name: string
  avatarURL: string
}

const Home: NextPage = () => {
  const [pokemons, setPokemons] = useState<ResultPokemons[]>(data)
  const [read, setRead] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setRead(true)
    }
  }, [])

  function handleOnDragEnd(result: DropResult) {
    if (!result.destination) return

    const items = Array.from(pokemons)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    setPokemons(items)
  }

  return (
    <div className={styles.container}>
      <div>
        {read && (
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="pokemons">
              {provided => (
                <ul {...provided.droppableProps} ref={provided.innerRef}>
                  {pokemons.map(item => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id.toString()}
                      index={item.id}
                    >
                      {provided => (
                        <li
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <div>
                            <Image
                              src={item.avatarURL}
                              alt={item.name}
                              layout="responsive"
                              sizes="100%"
                              width="50px"
                              height="50px"
                              objectFit="cover"
                            />
                          </div>

                          <strong>{item.name}</strong>
                        </li>
                      )}
                    </Draggable>
                  ))}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
        )}
      </div>
    </div>
  )
}

export default Home
