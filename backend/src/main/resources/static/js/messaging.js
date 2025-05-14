// messaging.js

document.addEventListener('DOMContentLoaded', async () => {
  populateUserInfo();

  // 1) load conversation list
  const convListEl = document.getElementById('conversation-list');
  const convResp = await fetchWithAuth('/api/secure-messages/conversations');
  if (!convResp.ok) {
    convListEl.innerHTML = '<p>Error loading conversations.</p>';
    return;
  }
  const convs = await convResp.json();
  convListEl.innerHTML = convs.map(c => `
    <div class="conv-item" data-partner="${c.partnerId}">
      ${c.partnerName}
      ${c.unreadCount>0?`<span class="unread-badge">${c.unreadCount}</span>`:``}
    </div>
  `).join('');

  document.querySelectorAll('.conv-item').forEach(el =>
    el.addEventListener('click', () => selectConversation(el.dataset.partner))
  );

  // auto-open if `?chat=` in URL
  const params = new URLSearchParams(window.location.search);
  if (params.has('chat')) {
    selectConversation(params.get('chat'));
  }
});

async function selectConversation(partnerId) {
  // highlight
  document.querySelectorAll('.conv-item').forEach(el =>
    el.classList.toggle('selected', el.dataset.partner === partnerId)
  );

  // set header
  const convResp = await fetchWithAuth('/api/secure-messages/conversations');
  const conv = (await convResp.json())
                .find(c => String(c.partnerId) === String(partnerId));
  document.getElementById('chat-with').textContent = conv
    ? `Chat with ${conv.partnerName}`
    : 'Select a conversation';

  // load history
  const historyEl = document.getElementById('message-history');
  const resp = await fetchWithAuth(`/api/secure-messages/${partnerId}/messages`);
  if (!resp.ok) {
    historyEl.innerHTML = '<p>Error loading messages.</p>';
    return;
  }
  const msgs = await resp.json();
  historyEl.innerHTML = msgs.map(m => `
    <div class="message ${m.senderId == localStorage.getItem('userId') ? 'sent' : 'received'}">
      <strong>${m.senderName}:</strong> ${m.content}
      <div class="timestamp">${new Date(m.timestamp).toLocaleTimeString()}</div>
    </div>
  `).join('');

  // show send form
  const form = document.getElementById('message-form');
  form.style.display = '';
  form.onsubmit = async e => {
    e.preventDefault();
    const content = document.getElementById('message-input').value;
    if (!content) return;
    await fetchWithAuth(`/api/secure-messages/${partnerId}/send?toUserId=${partnerId}&type=TEXT&content=${encodeURIComponent(content)}`, { method: 'POST' });
    document.getElementById('message-input').value = '';
    selectConversation(partnerId);
  };
}