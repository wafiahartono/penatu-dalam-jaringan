/**
 * @license
 * Copyright 2019 Wafi Azmi Hartono
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

export default class DataTable {
    // init = {
    //     immediate: false,
    //     orderOption: {
    //         asc: 'Ascending',
    //         desc: 'Descending'
    //     },
    //     orderByOption: {
    //         username: 'Username',
    //         nama: 'Nama',
    //         telepon: 'Telepon'
    //     },
    //     selectItemOption: [10, 25, 50, 100],
    //     message: {
    //         empty: 'Tidak ada data',
    //         error: 'Terjadi kesalahan saat mendapatkan data',
    //         initial: 'Tekan tombol refresh untuk mulai mendapatkan data',
    //         retrieve: 'Sedang mendapatkan data...',
    //     }
    // }
    constructor(root, init, updateCallback, updateFinishCallback) {
        const layout = {
            buttonNext: root.querySelector('.dt__button-next') ? true : false,
            buttonPrevious: root.querySelector('.dt__button-previous') ? true : false,
            buttonRefresh: root.querySelector('.dt__button-refresh') ? true : false,
            inputPage: root.querySelector('.dt__input-page') ? true : false,
            inputSearch: root.querySelector('.dt__input-search') ? true : false,
            selectItem: root.querySelector('.dt__select-item') ? true : false,
            selectOrder: root.querySelector('.dt__select-order') ? true : false,
            selectOrderBy: root.querySelector('.dt__select-order-by') ? true : false,
            textItemFrom: root.querySelector('.dt__text-item-from') ? true : false,
            textItemTo: root.querySelector('.dt__text-item-to') ? true : false,
            textItemTotal: root.querySelector('.dt__text-item-total') ? true : false,
            textPageTotal: root.querySelector('.dt__text-page-total') ? true : false
        }

        const pagination = {
            item: undefined,
            order: undefined,
            orderBy: undefined,
            page: 1,
            search: ''
        }

        const displayMessage = (show, message = '') => {
            root.querySelector('.dt__tbody').style.display = show ? 'none' : ''
            root.querySelector('.dt__message>tr>td').innerText = message
            root.querySelector('.dt__message').style.display = show ? '' : 'none'
        }

        const updateData = () => {
            displayMessage(true, init.message.retrieve)
            updateCallback(pagination).then(pageData => {
                if (pageData.data.length) {
                    ((row, item) => {
                        if (row < item) {
                            for (let i = 0; i < item - row; i++) root.querySelector('.dt__tbody').appendChild(root.querySelector('table>.dt__row').firstElementChild.cloneNode(true))
                        } else if (row > item) {
                            root.querySelectorAll('.dt__tbody>tr').forEach((el, index) => {
                                if (index > item - 1) el.style.display = 'none'
                            })
                        }
                        root.querySelectorAll('.dt__tbody>tr').forEach((el, index) => {
                            if (index < item) {
                                el.style.display = ''
                                el.querySelectorAll('td').forEach((el1, index1) => {
                                    el1.innerText = Object.values(pageData.data[index])[index1]
                                })
                            }
                        })
                    })(root.querySelector('.dt__tbody').childElementCount, 1 + pageData.item_to - pageData.item_from)
                    displayMessage(false)
                } else displayMessage(true, init.message.empty)
                if (layout.buttonNext) root.querySelector('.dt__button-next').disabled = pageData.page_current === pageData.page_total
                if (layout.buttonPrevious) root.querySelector('.dt__button-previous').disabled = pageData.page_current === 1
                if (layout.inputPage) root.querySelector('.dt__input-page').max = pageData.page_total
                if (layout.inputPage) root.querySelector('.dt__input-page').value = pageData.page_current
                if (layout.textItemFrom) root.querySelector('.dt__text-item-from').innerText = pageData.item_from
                if (layout.textItemTo) root.querySelector('.dt__text-item-to').innerText = pageData.item_to
                if (layout.textItemTotal) root.querySelector('.dt__text-item-total').innerText = pageData.item_total
                if (layout.textPageTotal) root.querySelector('.dt__text-page-total').innerText = pageData.page_total
                if (updateFinishCallback) updateFinishCallback()
            }).catch(error => {
                console.error(error)
                displayMessage(true, init.message.error)
            })
        }

        (() => {
            const tbody = root.querySelector('table').insertBefore(document.createElement('tbody'), root.querySelector('table>.dt__row'))
            tbody.className = 'dt__tbody'
            tbody.style.display = 'none'
        })();

        (() => {
            const tbody = root.querySelector('table').appendChild(document.createElement('tbody'))
            tbody.className = 'dt__message'
            const td = tbody.appendChild(document.createElement('tr')).appendChild(document.createElement('td'))
            td.colSpan = root.querySelector('table>.dt__row>tr').childElementCount
            td.innerText = init.message.initial
        })();

        if (layout.buttonNext) {
            root.querySelector('.dt__button-next').disabled = true
            root.querySelector('.dt__button-next').addEventListener('click', () => {
                pagination.page++
                updateData()
            })
        }

        if (layout.buttonPrevious) {
            root.querySelector('.dt__button-previous').disabled = true
            root.querySelector('.dt__button-previous').addEventListener('click', () => {
                pagination.page--
                updateData()
            })
        }

        if (layout.buttonRefresh) {
            root.querySelector('.dt__button-refresh').addEventListener('click', () => {
                updateData()
            })
        }

        if (layout.inputPage) {
            root.querySelector('.dt__input-page').max = 1
            root.querySelector('.dt__input-page').min = 1
            root.querySelector('.dt__input-page').type = 'number'
            root.querySelector('.dt__input-page').value = 1
            root.querySelector('.dt__input-page').addEventListener('change', event => {
                pagination.page = event.target.value
                updateData()
            })
        }

        if (layout.inputSearch) {
            root.querySelector('.dt__input-search').type = 'search'
            root.querySelector('.dt__input-search').addEventListener('change', event => {
                pagination.page = 1
                pagination.search = event.target.value
                updateData()
            })
        }

        if (layout.selectItem) {
            for (let i = 0; i < init.selectItemOption.length; i++) {
                const option = document.createElement('option')
                option.innerText = init.selectItemOption[i]
                option.value = init.selectItemOption[i]
                root.querySelector('.dt__select-item').add(option)
            }
            pagination.item = root.querySelector('.dt__select-item').value

            root.querySelector('.dt__select-item').addEventListener('change', event => {
                pagination.item = event.target.value
                pagination.page = 1
                updateData()
            })
        }

        if (layout.selectOrder) {
            for (const val in init.orderOption) {
                const option = document.createElement('option')
                option.innerText = init.orderOption[val]
                option.value = val
                root.querySelector('.dt__select-order').add(option)
            }
            pagination.order = root.querySelector('.dt__select-order').value

            root.querySelector('.dt__select-order').addEventListener('change', event => {
                pagination.order = event.target.value
                updateData()
            })
        }

        if (layout.selectOrderBy) {
            for (const val in init.orderByOption) {
                const option = document.createElement('option')
                option.innerText = init.orderByOption[val]
                option.value = val
                root.querySelector('.dt__select-order-by').add(option)
            }
            pagination.orderBy = root.querySelector('.dt__select-order-by').value

            root.querySelector('.dt__select-order-by').addEventListener('change', event => {
                pagination.orderBy = event.target.value
                updateData()
            })
        }

        if (init.immediate) updateData()
    }
}
