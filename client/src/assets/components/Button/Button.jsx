import PropTypes from 'prop-types';
import './Button.css';

export const Button = ({ 
    children, 
    variant = 'primary', 
    size = 'medium',
    fullWidth = false,
    disabled = false,
    loading = false,
    icon = null,
    iconPosition = 'left',
    onClick,
    type = 'button',
    className = '',
}) => {
    const buttonClasses = [
        'button',
        `button--${variant}`,
        `button--${size}`,
        fullWidth ? 'button--full-width' : '',
        loading ? 'button--loading' : '',
        icon ? 'button--with-icon' : '',
        `button--icon-${iconPosition}`,
        className
    ].filter(Boolean).join(' ');

    return (
        <button
            type={type}
            className={buttonClasses}
            onClick={onClick}
            disabled={disabled || loading}
        >
            {loading && (
                <span className="button__loader">
                    <span className="button__loader-dot"></span>
                    <span className="button__loader-dot"></span>
                    <span className="button__loader-dot"></span>
                </span>
            )}
            {!loading && icon && iconPosition === 'left' && (
                <span className="button__icon">{icon}</span>
            )}
            <span className="button__text">{children}</span>
            {!loading && icon && iconPosition === 'right' && (
                <span className="button__icon">{icon}</span>
            )}
        </button>
    );
};

Button.propTypes = {
    children: PropTypes.node.isRequired,
    variant: PropTypes.oneOf(['primary', 'secondary', 'outline', 'ghost', 'danger']),
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    fullWidth: PropTypes.bool,
    disabled: PropTypes.bool,
    loading: PropTypes.bool,
    icon: PropTypes.node,
    iconPosition: PropTypes.oneOf(['left', 'right']),
    onClick: PropTypes.func,
    type: PropTypes.oneOf(['button', 'submit', 'reset']),
    className: PropTypes.string,
};