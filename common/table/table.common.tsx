import {useCallback, useMemo, useRef} from 'react'
import {useNavigation} from 'react-auth-navigation'
import {
  TableContainer as MaterialTableContainer,
  Table as MaterialTable,
  TableBody as MaterialTableBody,
  TableHead as MaterialTableHead,
  TableRow as MaterialTableRow,
  Paper as MaterialPaper,
  Pagination as MaterialPagination
} from '@mui/material'
import {IoMdListBox} from 'react-icons/io'
import {AiFillDelete} from 'react-icons/ai'
import {MdEdit} from 'react-icons/md'

import {HStack, VStack} from 'src/common/stack'
import {Tooltip} from 'src/common/tooltip'
import {Modal} from 'src/common/modal'

import {ActionButton, StyledTableRow, StyledTableCell} from './table.style'
import {Button} from '../button'

export const Table = <T, K extends Extract<keyof T, string>>({
  columns,
  data = [],
  actions,
  loading = false,
  pagination
}: {
  columns: Array<{
    field: K
    name: string
    render?: (item: any) => React.ReactNode
  }>
  data: Array<T>
  actions?: {
    onEdit?: (item: T) => void
    onDelete?: (item: T) => void
    onView?: (item: T) => void
  }
  loading?: boolean
  pagination?: {
    perPage?: number
    totalCount: number
  }
}) => {
  const {location, navigation} = useNavigation()
  const {navigate} = navigation
  const actionsRef = useRef(actions)
  const hasActions = useMemo(() => {
    if (actionsRef.current) {
      return Object.keys(actionsRef.current).length > 0
    }
    return false
  }, [])

  const searchParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  )
  const page = searchParams.get('page')

  const onChange = useCallback(
    (newPageNumber: number) => {
      navigate(location.pathname + `?page=${newPageNumber}`)
    },
    [location]
  )

  return (
    <>
      <MaterialTableContainer
        component={MaterialPaper}
        variant="outlined"
        style={{
          border: '1px solid #e1e1e1',
          paddingBottom: 8
        }}
      >
        <MaterialTable aria-label="customized table">
          <MaterialTableHead>
            <MaterialTableRow>
              {columns.map((item, i) => {
                if (item.name) {
                  return (
                    <StyledTableCell
                      key={i}
                      align={`${i === 0 ? 'left' : 'center'}`}
                    >
                      {item.name}
                    </StyledTableCell>
                  )
                } else {
                  return (
                    <StyledTableCell
                      key={i}
                      align={`${i === 0 ? 'left' : 'center'}`}
                    >
                      {item.field}
                    </StyledTableCell>
                  )
                }
              })}
              {hasActions ? (
                <StyledTableCell align="center">Actions</StyledTableCell>
              ) : null}
            </MaterialTableRow>
          </MaterialTableHead>

          {loading ? (
            <MaterialTableBody>
              <MaterialTableRow>
                <StyledTableCell align="center" colSpan={columns.length + 1}>
                  Loading...
                </StyledTableCell>
              </MaterialTableRow>
            </MaterialTableBody>
          ) : data.length > 0 ? (
            <MaterialTableBody>
              {data.map((item, index) => {
                return (
                  <StyledTableRow key={index}>
                    {columns.map((col, i) => {
                      if (col.render) {
                        return (
                          <StyledTableCell
                            key={i}
                            align={`${i === 0 ? 'left' : 'center'}`}
                          >
                            {col.render(item[col.field])}
                          </StyledTableCell>
                        )
                      } else {
                        return (
                          <StyledTableCell
                            key={i}
                            align={`${i === 0 ? 'left' : 'center'}`}
                          >
                            {item[col.field] as string}
                          </StyledTableCell>
                        )
                      }
                    })}
                    {hasActions ? (
                      <StyledTableCell align="center" width={50}>
                        <HStack gap="$3">
                          {actionsRef.current?.onView && (
                            <Tooltip title="View" placement="topmiddle">
                              <ActionButton
                                onClick={(e) => {
                                  e.stopPropagation()
                                  actionsRef.current?.onView?.(item)
                                }}
                              >
                                <IoMdListBox size={22} />
                              </ActionButton>
                            </Tooltip>
                          )}

                          {actionsRef.current?.onEdit && (
                            <Tooltip title="Edit" placement="topmiddle">
                              <ActionButton
                                onClick={(e) => {
                                  e.stopPropagation()
                                  actionsRef.current?.onEdit?.(item)
                                }}
                              >
                                <MdEdit size={22} />
                              </ActionButton>
                            </Tooltip>
                          )}

                          {actionsRef.current?.onDelete && (
                            <Tooltip
                              title="Delete"
                              placement="topright"
                              closeOnClick
                            >
                              <Modal
                                trigger={() => (
                                  <ActionButton className="action-delete">
                                    <AiFillDelete size={22} />
                                  </ActionButton>
                                )}
                              >
                                {(modal) => (
                                  <VStack gap="$4">
                                    <div
                                      style={{
                                        fontWeight: 'bold'
                                      }}
                                    >
                                      Are you sure you want to delete ?
                                    </div>
                                    <HStack gap="$2" justify="end">
                                      <Button
                                        variant="outlined"
                                        color="default"
                                        onClick={(e) => {
                                          e.preventDefault()
                                          modal.close()
                                        }}
                                      >
                                        Cancel
                                      </Button>
                                      <Button
                                        color="error"
                                        onClick={(e) => {
                                          e.preventDefault()
                                          actionsRef.current?.onDelete?.(item)
                                          modal.close()
                                        }}
                                      >
                                        Delete
                                      </Button>
                                    </HStack>
                                  </VStack>
                                )}
                              </Modal>
                            </Tooltip>
                          )}
                        </HStack>
                      </StyledTableCell>
                    ) : null}
                  </StyledTableRow>
                )
              })}
            </MaterialTableBody>
          ) : (
            <div>No data</div>
          )}
        </MaterialTable>
      </MaterialTableContainer>

      {!loading && data.length > 0 && pagination && pagination.totalCount ? (
        <div style={{width: '100%', display: 'flex'}}>
          <MaterialPagination
            style={{
              marginLeft: 'auto',
              marginTop: 20,
              display: 'inline-block'
            }}
            count={Math.ceil(
              pagination.totalCount / (pagination.perPage ?? 10)
            )}
            boundaryCount={1}
            page={page ? Number(page) : 1}
            variant="outlined"
            shape="rounded"
            onChange={(e, page) => {
              e.preventDefault()
              onChange(page)
            }}
          />
        </div>
      ) : null}
    </>
  )
}
