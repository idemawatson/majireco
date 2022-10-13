import Player from '@/types/Player'
import useSWR from 'swr'

const usePlayersSWR = (
  key: string,
  initialData: Player[],
): [Player[], (state: Player[]) => void] => {
  const { data: state, mutate: setState } = useSWR(key, null, { fallbackData: initialData })
  return [state as Player[], setState]
}

export const usePlayers = () => {
  const [players, setPlayers] = usePlayersSWR('players', [])

  const addPlayer = (player: Player) => {
    if (players.length == 4) return
    setPlayers([...players, player])
  }

  return {
    players,
    addPlayer,
  }
}
