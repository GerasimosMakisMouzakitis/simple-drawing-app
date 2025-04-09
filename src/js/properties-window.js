/*
 * Copyright (c) 2025 Gerasimos Makis Mouzakitis
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at:
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

export function initializePropertiesWindow() {
    const propertiesWindow = document.getElementById('propertiesWindow');
    const closeButton = document.getElementById('closePropertiesButton');

    closeButton.addEventListener('click', () => {
        propertiesWindow.style.display = 'none';
    });
}

export function updatePropertiesWindow(line) {
    if (line) {
        document.getElementById('startX').textContent = line.start.x;
        document.getElementById('startY').textContent = line.start.y;
        document.getElementById('endX').textContent = line.end.x;
        document.getElementById('endY').textContent = line.end.y;

        const dx = line.end.x - line.start.x;
        const dy = line.end.y - line.start.y;
        const length = Math.sqrt(dx * dx + dy * dy).toFixed(2);
        document.getElementById('lineLength').textContent = length;
    }
}