import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error('[ErrorBoundary caught]', error, info);
  }

  handleReload = () => {
    // Clear any potentially corrupted local state that might cause crash
    try {
      const keysToKeep = [];
      for (let i = 0; i < localStorage.length; i++) {
        keysToKeep.push(localStorage.key(i));
      }
      // Only remove cached notification/event data, keep user session
      const removable = keysToKeep.filter(k =>
        k.startsWith('notify_') || k.startsWith('events_cache_')
      );
      removable.forEach(k => localStorage.removeItem(k));
    } catch (_) {}
    window.location.reload();
  };

  handleLogout = () => {
    try {
      localStorage.removeItem('mockUser_sonl');
    } catch (_) {}
    window.location.reload();
  };

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div style={{
        position: 'fixed', inset: 0,
        background: 'linear-gradient(135deg, #f0f4ff 0%, #f8f0ff 100%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: "'Nunito', -apple-system, sans-serif",
        zIndex: 99999,
      }}>
        {/* Background blobs */}
        <div style={{
          position: 'absolute', top: '-10%', right: '-10%',
          width: '400px', height: '400px',
          background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)',
          borderRadius: '50%', pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute', bottom: '-10%', left: '-10%',
          width: '500px', height: '500px',
          background: 'radial-gradient(circle, rgba(168,85,247,0.10) 0%, transparent 70%)',
          borderRadius: '50%', pointerEvents: 'none'
        }} />

        {/* Card */}
        <div style={{
          background: 'white',
          borderRadius: '28px',
          padding: '48px 40px',
          maxWidth: '440px',
          width: 'calc(100% - 40px)',
          boxShadow: '0 24px 80px rgba(0,0,0,0.10), 0 4px 20px rgba(99,102,241,0.08)',
          border: '1px solid rgba(99,102,241,0.12)',
          textAlign: 'center',
          position: 'relative',
          animation: 'ebPopIn 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
        }}>
          {/* Icon */}
          <div style={{
            width: '80px', height: '80px', borderRadius: '24px',
            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 24px',
            boxShadow: '0 12px 32px rgba(99,102,241,0.35)',
            fontSize: '36px',
          }}>
            🔄
          </div>

          <h1 style={{
            fontSize: '22px', fontWeight: '800',
            color: '#1e1b4b', margin: '0 0 10px',
            letterSpacing: '-0.3px',
          }}>
            Ứng dụng cần tải lại
          </h1>

          <p style={{
            fontSize: '14px', color: '#64748b', fontWeight: '600',
            lineHeight: '1.6', margin: '0 0 32px',
          }}>
            Đã xảy ra sự cố không mong muốn. Nhấn <strong>Tải lại</strong> để khôi phục ứng dụng về trạng thái bình thường.
          </p>

          {/* Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <button
              onClick={this.handleReload}
              style={{
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                color: 'white', border: 'none', borderRadius: '14px',
                padding: '14px 24px', fontSize: '15px', fontWeight: '800',
                cursor: 'pointer', width: '100%',
                boxShadow: '0 8px 24px rgba(99,102,241,0.35)',
                transition: 'transform 0.2s, box-shadow 0.2s',
                fontFamily: 'inherit',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(99,102,241,0.45)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(99,102,241,0.35)';
              }}
            >
              🔄 Tải lại ứng dụng
            </button>

            <button
              onClick={this.handleLogout}
              style={{
                background: '#f1f5f9', color: '#475569',
                border: '1px solid #e2e8f0', borderRadius: '14px',
                padding: '13px 24px', fontSize: '14px', fontWeight: '700',
                cursor: 'pointer', width: '100%',
                transition: 'background 0.2s',
                fontFamily: 'inherit',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#e2e8f0'}
              onMouseLeave={e => e.currentTarget.style.background = '#f1f5f9'}
            >
              🚪 Đăng xuất &amp; Tải lại
            </button>
          </div>

          <p style={{
            fontSize: '11px', color: '#94a3b8', fontWeight: '600',
            margin: '20px 0 0', lineHeight: '1.5',
          }}>
            Nếu lỗi vẫn tiếp tục, vui lòng liên hệ quản trị viên.
          </p>
        </div>

        <style>{`
          @keyframes ebPopIn {
            from { opacity: 0; transform: scale(0.92) translateY(20px); }
            to   { opacity: 1; transform: scale(1)   translateY(0); }
          }
        `}</style>
      </div>
    );
  }
}

export default ErrorBoundary;
