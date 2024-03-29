package com.hyun.boardback.filter;

import java.io.IOException;

import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import com.hyun.boardback.provider.JwtProvider;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    
    private final JwtProvider jwtProvider;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        
        try {
            String token = parseBearerToken(request);

            if(token == null){
                filterChain.doFilter(request, response);
                return;
            }

            String email = jwtProvider.validate(token);

            if(email == null){
                filterChain.doFilter(request, response);
                return;
            }

            AbstractAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(email, null, AuthorityUtils.NO_AUTHORITIES);

            authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

            SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
            securityContext.setAuthentication(authenticationToken);

            SecurityContextHolder.setContext(securityContext);

        } catch (Exception exception) {
            exception.printStackTrace();
        }

        filterChain.doFilter(request, response);
    }

    private String parseBearerToken(HttpServletRequest request){

        String authorization = request.getHeader("Authorization");

        boolean hasAuthorization = StringUtils.hasText(authorization);  // null, 길이가 0, 공백이면 false 반환

        if(!hasAuthorization) return null;

        boolean isBearer = authorization.startsWith("Bearer "); // Bearer 로 시작하면 true
        if(!isBearer) return null;

        String token = authorization.substring(7); // 7번 인덱스부터 추출
        return token;
    }
}
